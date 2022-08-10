<?php

namespace Edutiek\LongEssayService\Corrector;
use Edutiek\LongEssayService\Base;
use Edutiek\LongEssayService\Data\DocuItem;

/**
 * API of the LongEssayService for an LMS related to the correction of essays
 * @package Edutiek\LongEssayService\Corrector
 */
class Service extends Base\BaseService
{
    /**
     * @const Path of the frontend web app, relative to the service root directory, without starting slash
     */
    public const FRONTEND_RELATIVE_PATH = 'node_modules/long-essay-corrector/dist/index.html';

    /** @var Context */
    protected $context;

    /**
     * Service constructor.
     * A class implementing the Context interface must be provided by the LMS for this service
     *
     * @param Context $context
     */
    public function __construct(Context $context)
    {
        parent::__construct($context);
    }


    /**
     * @inheritDoc
     */
    protected function setSpecificFrontendParams()
    {
        if (!empty($item = $this->context->getCurrentItem())) {
            $this->setFrontendParam('Item', $item->getKey());
        }
    }



    /**
     * Handle a REST like request from the LongEssayCorrector Web App
     * @throws \Throwable
     */
    public function handleRequest()
    {
        $server = new Rest(
            [
                'settings' => [
                    'displayErrorDetails' => true
                ]
            ]
        );

        $server->init($this->context, $this->dependencies);
        $server->run();
    }

    /**
     * Get a pdf from a corrected essay
     */
    public function getCorrectionAsPdf(DocuItem $item) : string
    {
        $task = $item->getWritingTask();
        $essay = $item->getWrittenEssay();

        $allHtml = '';

        if ($essay->getCorrectionFinalized()) {

            $allHtml .= "<b>Korrektur beeendet:</b> " . $this->formatDates($essay->getCorrectionFinalized()) . '<br>';
            $allHtml .= "<b>Korrektur beeendet durch:</b> " . $essay->getCorrectionFinalizedBy() . '<br>';
            $allHtml .= "<b>Finale Punktzahl:</b> " . $essay->getFinalPoints() . '<br>';
            $allHtml .= "<b>Finale Bewertung:</b> " . $essay->getFinalGrade() . '<br>';
            $allHtml .= '<br><hr><p></p>';
        }

        $allHtml .= $this->dependencies->html()->processWrittenTextForPdf((string) $essay->getWrittenText());

        foreach ($item->getCorrectionSummaries() as $summary) {

            $allHtml = $allHtml . '<br><hr><p></p>';
            $allHtml .= "<b>Korrektor:</b> " . $summary->getCorrectorName() . '<br>';
            $allHtml .= "<b>Korrigiert:</b> " . $this->formatDates($summary->getLastChange()) . '<br>';
            $allHtml .= "<b>Vergebene Punkte:</b> " . $summary->getPoints() . '<br>';
            $allHtml .= "<b>Bewertung:</b> " . $summary->getGradeTitle() . '<br>';
            $allHtml .= "<b>Kommentar:</b>" . $summary->getText();
        };

        return $this->dependencies->pdfGeneration()->generatePdfFromHtml(
            $allHtml,
            $this->context->getSystemName(),
            $task->getWriterName(),
            $task->getTitle(),
            $task->getWriterName() . ' ' . $this->formatDates($essay->getEditStarted(), $essay->getEditEnded())
        );
    }


}